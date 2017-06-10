namespace State {

    abstract class State {
        context: Light;
        constructor(context: Light) {
            this.context = context;
        }
        abstract get state(): string;
        abstract buttonPress(): void;
    }

    class OffLightEnabled extends State {
        buttonPress() {
            this.context.setCurrentState(this.context.weakLightState);          
        }
        get state(): string {
            return 'off light';
        }
    }

    class WeakLightState extends State {
        buttonPress() {
            this.context.setCurrentState(this.context.strongLightState);          
        }
        get state(): string {
            return 'weak light';
        }
    }

    class StrongLightState extends State {
        buttonPress() {
            this.context.setCurrentState(this.context.offLightState);          
        }
        get state(): string {
            return 'strong light';
        }
    }

    class Light {
        offLightState: State = new OffLightEnabled(this);
        weakLightState: State = new WeakLightState(this);
        strongLightState: State = new StrongLightState(this);
        currentState: State = this.offLightState;
        setCurrentState(state: State) {
            this.currentState = state;
        }
        get state() {
            return this.currentState.state;
        }
        pressButton() {
            this.currentState.buttonPress();
        }
    }

    const light = new Light();
    console.log('init:', light.state);
    light.pressButton();
    console.log('press button:', light.state);
    light.pressButton();
    console.log('press button again:', light.state);
}