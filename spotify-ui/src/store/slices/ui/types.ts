export enum ModalOptions {
    login = "login",
    transfer_device = "transfer_device"
}

export type UIState = {
    modal: ModalOptions | null;
    device_id: string | null;
    promptedDeviceTransfer: boolean
}