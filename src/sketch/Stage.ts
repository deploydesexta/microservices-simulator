import { Transfer } from "./Transfer";

class Stage {

  private transfers: Transfer[] = [];
  
  public push(transfer: Transfer) {
    this.transfers.push(transfer);
  }

  public draw() {
    for (let i = 0; i < this.transfers.length; i++) {
      const transfer = this.transfers[i];

      transfer.update();
      transfer.draw();

      if (transfer.isFinished()) {
        transfer.notify();
        this.transfers.splice(i, 1);
      }
    }
  }
}

export {
  Stage,
}