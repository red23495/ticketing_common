import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subject";

export interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract readonly subject: T['subject'];
  abstract readonly queueGroupName: string;
  protected ackWait: number = 5 * 1000;

  abstract onMessage(data: T["data"], msg: Message): void;

  constructor(private client: Stan) {}

  getSubscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.getSubscriptionOptions()
    );
    subscription.on("message", (msg: Message) => {
      this.onMessage(this.parseMessage(msg), msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    if (typeof data === "string") return JSON.parse(data);
    return JSON.parse(data.toString("utf8"));
  }
}

export abstract class Publisher<T extends Event> {
  abstract readonly subject: Subjects;

  constructor(private client: Stan) {}

  publish(data: T["data"]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}
