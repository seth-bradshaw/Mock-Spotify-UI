class PositionInterval {
    interval: null | NodeJS.Timeout;
    position: number;
    duration: number;

    constructor() {
        this.position = 0;
        this.interval = null;
        this.duration = 0;
    }

    startIntervalAt(position: number, duration: number, cb: (pos: number, dur: number) => void) {
        this.duration = duration;
        this.position = position;

        this.removeInterval();

        this.interval = setInterval(() => {
            if (this.position < this.duration) {
                this.position += 1000;
                cb(this.position, this.duration)
            } else { 
                this.removeInterval();
            }
        }, 1000)
    }

    removeInterval() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

export default PositionInterval;