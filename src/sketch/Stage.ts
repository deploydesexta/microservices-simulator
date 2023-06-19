import { Transfer } from "./Transfer";

class Stage {

  private transfers: Transfer[] = [];
  
  public push(transfer: Transfer) {
    this.transfers.push(transfer);
  }

  public draw() {
    this.transfers.forEach((transfer: Transfer, index: number) => {
      transfer.update();
      transfer.draw();
      transfer.afterDraw();

      if (transfer.isFinished()) {
          this.transfers.splice(index);
      }      
    });
  }
}

export {
  Stage,
}