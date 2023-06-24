import { P5 } from "@/types";
import { Transfer } from "./models/Transfer";

class StageManager {

  private transfers: Transfer[] = [];
  
  public add(transfer: Transfer) {
    this.transfers.push(transfer);
  }

  public draw(sketch: P5) {
    for (let i = 0; i < this.transfers.length; i++) {
      const transfer = this.transfers[i];

      transfer.update();
      transfer.draw(sketch);

      if (transfer.isFinished()) {
        transfer.notify();
        this.transfers.splice(i, 1);
      }
    }
  }
}

const stageManager = new StageManager();

export {
  StageManager,
}

export default stageManager;