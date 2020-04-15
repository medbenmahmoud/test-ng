import { Component, OnInit } from "@angular/core";
import * as mathjs from "mathjs";

@Component({
  selector: "app-example-tow",
  templateUrl: "./example-tow.component.html",
  styleUrls: ["./example-tow.component.css"],
})
export class ExampleTowComponent implements OnInit {
  public value: string[] = [];
  public hasError: boolean = false;
  active = 1;
  public formulaList: any[] = [];
  public operands = {
    id: "0",
    text: "Operands",
    children: [
      {
        id: "1",
        text: "1-Somme",
      },
      {
        id: "2",
        text: "22-Somme",
      },
      {
        id: "3",
        text: "3-Moy",
      },
      {
        id: "4",
        text: "44-Somme",
      },
    ],
  };
  public operators = {
    id: "0",
    text: "opérateur ",
    children: [
      {
        id: "+",
        text: "+",
      },
      {
        id: "-",
        text: "-",
      },
      {
        id: "/",
        text: "/",
      },
      {
        id: "x",
        text: "x",
      },
    ],
  };
  public mathFunctionslist = {
    id: "0",
    text: "Operands",
    children: [
      {
        id: "cos",
        text: "cos",
      },
      {
        id: "sin",
        text: "sin",
      },
    ],
  };

  public symbol = {
    id: "0",
    text: "symbole",
    children: [
      {
        id: "(",
        text: "(",
      },
      {
        id: ")",
        text: ")",
      },
      {
        id: "[",
        text: "[",
      },
      {
        id: "]",
        text: "]",
      },
    ],
  };

  constructor() {}

  ngOnInit() {}

  selectAction(item) {
    this.formulaList.push({ id: item.id, text: item.text });
    const expression = this.generateExpression();
    this.isValidMathExpression(expression);
  }

  generateExpression() {
    let expression = "";
    this.formulaList.forEach((item) => {
      if (this.operands.children.find((x) => x.id == item.id)) {
        expression += "x";
      } else if (this.mathFunctionslist.children.find((x) => x.id == item.id)) {
        expression += "abs";
      } else {
        expression += item.text;
      }
    });
    console.log(expression);
    return expression;
  }

  isValidMathExpression(expr) {
    try {
      mathjs.parse(expr);
      this.hasError = false;
      return true;
    } catch (ex) {
      console.log(ex);
      this.hasError = true;
      return false;
    }
  }

  getSelectList(item) {
    if (this.operands.children.find((x) => x.id == item.id)) {
      return this.operands.children;
    } else if (this.operators.children.find((x) => x.id == item.id)) {
      return this.operators.children;
    } else if (this.symbol.children.find((x) => x.id == item.id)) {
      return this.symbol.children;
    } else if (this.mathFunctionslist.children.find((x) => x.id == item.id)) {
      return this.mathFunctionslist.children;
    } else {
      return [];
    }
  }

  getStyle(item) {
    if (this.operators.children.find((x) => x.id == item.id)) {
      return "bold";
    } else if (this.symbol.children.find((x) => x.id == item.id)) {
      return "bold";
    } else if (this.mathFunctionslist.children.find((x) => x.id == item.id)) {
      return "italic";
    }
    return "";
  }
}
