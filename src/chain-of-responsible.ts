namespace ChainOfResponsibility {
    type RequestType = 'help' | 'feedback';

    interface Request {
        type: RequestType;
    }

    class Handler {
        private successor: Handler;
        handle(request: Request): void {
            if (this.successor) {
                this.successor.handle(request);
            }
        }
        after(successor : Handler) {
            this.successor = successor;
            return this.successor;
        }
        
    }

    class HelpHandler extends Handler {
        handle(request: Request): void {
            if (request.type === 'help') {
                console.log('help handled');
            } else {
                super.handle(request);
            }
        }
    }

    class FeedbackHandler extends Handler {
        handle(request: Request): void {
            if (request.type === 'feedback') {
                console.log('feedback handled');
            } else {
                super.handle(request);
            }
        }
    }

    const help = new HelpHandler();
    const feedback = new FeedbackHandler();
    help.after(feedback);
    help.handle({type: 'feedback'});
}

