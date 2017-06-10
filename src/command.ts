namespace Command {
    class TextContext {
        content = 'text content';
    }

    abstract class TextCommand {
        constructor(public context: TextContext) { }
        abstract execute(...args: any[]): void;
    }

    class undoCommand extends TextCommand {
        origin: string;
        constructor(context: TextContext, origin: string) {
            super(context);
            this.origin = origin;
        };
        execute() {
            this.context.content = this.origin;
        }
    }
    
    class ReplaceCommand extends TextCommand {
        execute(index: number, length: number, text: string) {
            let content = this.context.content;
            this.context.content =
                content.substr(0, index) +
                text +
                content.substr(index + length);
            //return new undoCommand(this.context, content);
            return function() {
            ((context: TextContext, origin: string) => 
                context.content = origin)(this.context, content)
            }.bind(this);
        }
    }

    class InsertCommand extends TextCommand {
        execute(index: number, text: string) {
            let content = this.context.content;
            let origin = Object.assign({}, content);
            this.context.content =
                content.substr(0, index) +
                text +
                content.substr(index); 
        }
    }

    interface TextCommandInfo {
        command: TextCommand,
        args: any[];
    }

    class MacroTextCommand {
        constructor(public infos: TextCommandInfo[]) { }

        execute(): void {
            for (let info of this.infos) {
                info.command.execute(...info.args);
            }
        }
    }

    class Client {
        private context = new TextContext();
        replaceCommand = new ReplaceCommand(this.context);
        insertCommand = new InsertCommand(this.context);
        getContext() {
            return this.context;
        }
    }

    let client = new Client();
    console.log('origin:', client.getContext());
    const undo = client.replaceCommand.execute(0, 4, 'the');
    console.log('replaced:', client.getContext());
    undo();
    console.log('undo:', client.getContext());
    client.insertCommand.execute(0, 'awesome ');
    console.log(client.getContext());      
}
