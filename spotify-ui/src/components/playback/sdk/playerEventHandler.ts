import { AnyObj, PlayerState } from "../context/types";

type PlayerEventHandler = (state: PlayerState) => void;

const playbackBus = new Map();

// TODO update to Player type once ready
// * Pass player instance, event name, and handler cb
const playerEventHandler = (player: AnyObj, name: string, subscriptionId: string, handler: PlayerEventHandler) => {
    if (!player) {
        return;
    }

    const callback = (state: PlayerState) => {
        if (!state) {
            return;
        }
        handler(state);
    }

    // dynamically adds event to map if not already defined
    if (!playbackBus.get(name)) {
        playbackBus.set(name, {})
    }

    if (playbackBus.get(name)[subscriptionId]) {
        player.removeListener(name, playbackBus.get(name)[subscriptionId])
        player.addListener(name, callback)
        playbackBus.set(name, {...playbackBus.get(name), [subscriptionId]: handler})
    } else {
        player.addListener(name, callback);
        playbackBus.set(name, {...playbackBus.get(name), [subscriptionId]: handler})
    }
}

export default playerEventHandler;