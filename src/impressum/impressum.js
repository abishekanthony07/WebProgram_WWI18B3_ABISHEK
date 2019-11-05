"use strict";
import App from "../app.js";
let db1;

class Impressum{
    constructor(app1, datenbank1){
        this._app = app1;
        this.db = datenbank1;
        db1 = this.db;
    }

    onShow(){
        let section = document.querySelector("#impressumSeite").cloneNode(true);
        let content = {
            className: "visible",
            main: section.querySelectorAll("main > *"),
        };
        return content;
    }

    onLoad(){
    }

    onLeave(){
        return true;
    }

    get title(){
        return "Bmi-Rechner";
    }
}
export default Impressum;