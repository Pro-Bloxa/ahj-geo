import verifyCoords from "./verify-coords";

export default class Widget {
  constructor() {
    this.container = document.querySelector(".widget-container");
    this.form = document.querySelector(".form");
    this.addTicket = this.addTicket.bind(this);
    this.elem = null;
  }

  createWidget() {
    this.form.addEventListener("submit", this.addTicket);
  }

  addTicket(event) {
    event.preventDefault();
    this.elem = document.createElement("span");
    this.elem.textContent = event.target.input.value;

    this.getPosition();
  }

  getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const activeLatitude = latitude;
          const activeLongitude = longitude;
          const data = `${activeLatitude}, ${activeLongitude}`;

          this.showTicket(data);
        },
        (error) => {
          this.showModal();
          console.error(error);
        }
      );
    }
  }

  resetInput() {
    this.container.querySelector(".form-input").value = "";
  }

  showTicket(data) {
    const list = document.querySelector(".list");
    const ticket = document.createElement("div");
    ticket.classList.add("ticket");
    ticket.innerHTML = `
    <div class="elem"></div>
     <div class="date">${new Date().toLocaleString()}</div>
     <div class="geo">[${data}]</div>`;

    list.insertAdjacentElement("afterbegin", ticket);
    this.container
      .querySelector(".elem")
      .insertAdjacentElement("afterbegin", this.elem);
    this.resetInput();
  }

  showModal() {
    const modal = this.container.querySelector(".modal");
    modal.classList.remove("hidden");
    this.container
      .querySelector(".modal-input")
      .addEventListener("input", this.deleteError);

    this.container
      .querySelector(".modal-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();

        const isValid = verifyCoords(event.target.modal.value);

        if (isValid) {
          this.hideModal();
          this.showTicket(isValid);
        } else {
          alert("Координаты введены не верно");
        }
      });

    this.container
      .querySelector(".modal-form")
      .addEventListener("reset", (event) => {
        event.preventDefault();
        this.hideModal();
      });
  }

  hideModal() {
    this.container.querySelector(".modal").classList.add("hidden");
    this.resetInput();
  }
}
