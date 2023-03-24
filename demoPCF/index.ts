import { setUncaughtExceptionCaptureCallback } from "process";
import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class demoPCF
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  /**
   * Empty constructor.
   */
  private container: HTMLDivElement;
  private FirstNumber: HTMLInputElement;
  private SecondNumber: HTMLInputElement;
  private AddButton: HTMLButtonElement;
  private SubButton: HTMLButtonElement;
  private MulButton: HTMLButtonElement;
  private DivButton: HTMLButtonElement;
  private ClearButton: HTMLButtonElement;
  private lableHeading: HTMLLabelElement;
  private DisplayLable: HTMLLabelElement;
  private _value: number;
  private _notifyOutputChanged: () => void;

  // Add Function Call
  public CalculatorFunction(result: number) {
    this._value = result;
    this._notifyOutputChanged();
  }
  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    // Add control initialization code

    //   Add Lable
    this.DisplayLable = document.createElement("label");
    this.DisplayLable.setAttribute("id", "LableId");
    this.DisplayLable.innerHTML = "calculator";
    container.append(this.DisplayLable);

    // FirstNumber Input

    this.FirstNumber = document.createElement("input");
    this.FirstNumber.setAttribute("name", "FirstNumber");
    this.FirstNumber.setAttribute("placeholder", "FirstNumber");
    this.FirstNumber.setAttribute("id", "firstId");
    this.FirstNumber.setAttribute("class", "InputClass");

    container.append(this.FirstNumber);

    // SecondNumber Input
    this.SecondNumber = document.createElement("input");
    this.SecondNumber.setAttribute("name", "SecondNumber");
    this.SecondNumber.setAttribute("placeholder", "SecondNumber");
    this.SecondNumber.setAttribute("id", "secondId");
    this.SecondNumber.setAttribute("class", "InputClass");
    container.append(this.SecondNumber);

    // Add lable to display Result
    // this.DisplayLable = document.createElement("label");
    // this.DisplayLable.setAttribute("id", "LableId");
    // container.append(this.DisplayLable);

    //AddButton Code
    this.AddButton = document.createElement("button");
    this.AddButton.setAttribute("name", "AddButton");
    this.AddButton.setAttribute("type", "submit");
    this.AddButton.setAttribute("id", "AddBtn");
    this.AddButton.setAttribute("class", "classbtn");
    this.AddButton.innerHTML = "Add";
    container.append(this.AddButton);

    this.AddButton.addEventListener("click", () => {
      this.CalculatorFunction(
        +this.FirstNumber.value + +this.SecondNumber.value
      );
    });

    // SubtractButton Code
    this.SubButton = document.createElement("button");
    this.SubButton.setAttribute("name", "SubButton");
    this.SubButton.setAttribute("type", "submit");
    this.SubButton.setAttribute("id", "subBtn");
    this.SubButton.setAttribute("class", "classbtn");
    this.SubButton.innerHTML = "Sub";
    container.append(this.SubButton);

    this.SubButton.addEventListener("click", () => {
      this.CalculatorFunction(
        +this.FirstNumber.value - +this.SecondNumber.value
      );
    });

    //Multiplay button code

    this.MulButton = document.createElement("button");
    this.MulButton.setAttribute("name", "MulButton");
    this.MulButton.setAttribute("type", "submit");
    this.MulButton.setAttribute("id", "mulBtn");
    this.MulButton.setAttribute("class", "classbtn");
    this.MulButton.innerHTML = "mul";
    container.append(this.MulButton);

    this.MulButton.addEventListener("click", () => {
      this.CalculatorFunction(
        parseInt(this.FirstNumber.value) * parseInt(this.SecondNumber.value)
      );
    });

    // divide button code

    this.DivButton = document.createElement("button");
    this.DivButton.setAttribute("name", "DivButton");
    this.DivButton.setAttribute("type", "submit");
    this.DivButton.setAttribute("id", "divBtn");
    this.DivButton.setAttribute("class", "classbtn");
    this.DivButton.innerHTML = "Div";
    container.append(this.DivButton);

    this.DivButton.addEventListener("click", () => {
      this.CalculatorFunction(
        parseInt(this.FirstNumber.value) / parseInt(this.SecondNumber.value)
      );
    });

    // Add Clear Button
    this.ClearButton = document.createElement("button");
    this.ClearButton.setAttribute("name", "ClearButton");
    this.ClearButton.setAttribute("type", "submit");
    this.ClearButton.setAttribute("id", "ClearBtn");
    this.ClearButton.setAttribute("class", "classbtn");
    this.ClearButton.innerHTML = "Clear";
    container.append(this.ClearButton);

    this.ClearButton.addEventListener("click", () => {
      this.CalculatorFunction(
        parseInt((this.FirstNumber.value = "")) /
          parseInt((this.SecondNumber.value = ""))
      );
    });

    this._notifyOutputChanged = notifyOutputChanged;
    //this.container.style.dataResult;
  }

  // Get Input from FirstNumber And SecondNumber

  //

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // Add code to update control view
    ///this.container.innerHTML=context.parameters.sampleProperty.raw || "";
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return {
      dataResult: this._value,
    };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
  }
}
