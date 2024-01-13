import { AnyObj, PlayerState } from "../context/types";

type PlayerEventHandler = (state: PlayerState) => void;

const playbackBus = new Map();

// TODO update to Player type once ready
// * Pass player instance, event (Player event, e.g 'player_state_changed'), subscriptionId, and handler callback (e.g. maybeUpdateState)
const playerEventHandler = (player: AnyObj, event: string, subscriptionId: string, handler: PlayerEventHandler) => {
    if (!player) {
        return;
    }

    const callback = (state: PlayerState | null | undefined) => {
        if (!state || !state?.track_window?.current_track) {
            return;
        }
        handler(state);
    }

    // * adds event with empty subscription object to map if not already defined
    if (!playbackBus.get(event)) {
        playbackBus.set(event, {})
    }

    // * check if subscription callback already exists
    if (playbackBus.get(event)[subscriptionId]) {
        // * remove existing callback
        player.removeListener(event, playbackBus.get(event)[subscriptionId])
        player.addListener(event, callback)
        playbackBus.set(event, { ...playbackBus.get(event), [subscriptionId]: handler })
    } else {
        player.addListener(event, callback);
        playbackBus.set(event, { ...playbackBus.get(event), [subscriptionId]: handler })
    }
}

export default playerEventHandler;