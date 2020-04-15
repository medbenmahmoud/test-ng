import { Component, OnInit, ViewChild } from "@angular/core";
import { Select2OptionData, NgSelect2Component } from "ngSelect2";
import { Options } from "select2";
import * as mathjs from "mathjs";
@Component({
  selector: "app-formula",
  templateUrl: "./formula.component.html",
  styleUrls: ["./formula.component.css"],
})
export class FormulaComponent implements OnInit {
  @ViewChild("ngSelect", { static: true }) ngSelect: NgSelect2Component;
  public exampleData: Array<Select2OptionData>;
  public hasError: boolean = false;
  public options: Options;
  public value: string[] = [];
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

  ngOnInit() {
    this.exampleData = [this.operands, this.symbol, this.mathFunctionslist];
    this.options = {
      width: "100%",
      //templateResult: this.formatResultData,
      tags: true,
      multiple: true,
    };
  }
  formatResultData(data) {
    if (!data.id) {
      return data.text;
    }

    if (data.element && data.element.selected) {
      return;
    }

    return data.text;
  }
  onSelect(e) {
    //this.ngSelect.element.append('<option value="' + e.params.data.id + '">' + e.params.data.text + '</option>');
    if (this.operands.children.find((x) => x.id === e.params.data.id)) {
      this.exampleData = [this.operators];
    } else if (this.symbol.children.find((x) => x.id === e.params.data.id)) {
      this.exampleData = [this.operands, this.mathFunctionslist, this.symbol];
    } else if (
      this.mathFunctionslist.children.find((x) => x.id === e.params.data.id)
    ) {
      this.exampleData = [this.symbol];
    } else {
      this.exampleData = [this.operands, this.mathFunctionslist, this.symbol];
    }
    this.value = [];
    this.formulaList.push({ id: e.params.data.id, text: e.params.data.text });
    const expression = this.generateExpression();
    this.isValidMathExpression(expression);
  }

  onUnSelect(e) {
    e.params.data.element.remove();
  }

  onValueChanged(val) {
    console.log(val);
  }

  removeFromFormula(item) {
    this.formulaList = this.formulaList.filter((x) => x.id != item.id);
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
