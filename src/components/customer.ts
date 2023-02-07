export class Customer {
  private email: string;
  private text: string;
  private schedule: number[];

  constructor(email: string, text: string, schedule: string) {
    this.email = email;
    this.text = text;

    if (!/^(\d+s)(-(\d+s))*$/.test(schedule)) {
      throw new Error(`Invalid schedule format: "${schedule}"`);
    } else {
      this.schedule = schedule.split('-').map(s => parseInt(s.slice(0, -1)));
    }
  }

  public getEmail(): string {
    return this.email;
  }

  public getText(): string {
    return this.text;
  }

  public getSchedule(): number[] {
    return this.schedule;
  }
}
