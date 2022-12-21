import { changeVolume } from "../../../services";

type InterceptEventInfo = {
  volume_percent: number;
  type: string;
};

class BufferVolumeService {
  time: number | null; // in ms
  swipeDuration: number; // in ms
  bufferDuration: number;

  constructor(swipeDuration?: number) {
    this.time = null;
    this.swipeDuration = swipeDuration ?? 1000; // average swipe duration, default to 1 second
    this.bufferDuration = this.swipeDuration / 10; // update volume 10 times in a given swipe
  }

  interceptEvent({ volume_percent, type }: InterceptEventInfo) {
    if (type === "click") {
      // * click is the last event fired while interacting with slider
      // * change volume, close/reset buffer
      this.close(volume_percent);
      return;
    }

    this.handleBuffer(volume_percent);
  }

  handleBuffer(volume_percent: number) {
    const date = new Date();
    const curTime = date.getTime();
    if (!this.time) {
      this.time = curTime;
    }

    if (curTime - this.time > this.bufferDuration) {
      this.time = curTime;
      this.callUpdateVolume(volume_percent);
    }
  }

  callUpdateVolume(volume_percent: number) {
    changeVolume({ volume_percent });
  }

  close(volume_percent: number) {
    this.callUpdateVolume(volume_percent);
    this.time = null;
  }
}

export default BufferVolumeService;
