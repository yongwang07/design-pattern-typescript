namespace Observer {
    type Listener = (payload: any) => void;
    class Event {
        static cache : {
            [id: string] : Listener[]
        } = {};

        namespace: string = 'default';

        constructor(namespace: string = '') {
            this.namespace = namespace || 'default';
        }
        
        private globalEvent(event: string): string {
            return this.namespace + '.' + event;
        }

        listen(event: string, listener: Listener) {
            event = this.globalEvent(event);
            if (!Event.cache[event]) {
                Event.cache[event] = [];
            }
            Event.cache[event].push(listener);
        }

        on(event: string, listener: Listener) {
            const fn = function(args: any) {
                listener(args);
                this.remove(event, fn);
            }.bind(this);
            this.listen(event, fn);
        }

        remove(event: string, fn: Listener) {
            event = this.globalEvent(event);
            if(Event.cache[event] && fn) {
                 Event.cache[event] = Event.cache[event].filter(callback => callback !== fn);
            }
        }

        trigger(event: string, payload: any) {
            event = this.globalEvent(event);
            if (Event.cache[event]) {
                Event.cache[event].forEach((listener: Listener) => listener(payload));
            }
        }

        create(name_space: string):  Event {
            return new Event(name_space);   
        }
    }

    const event = new Event();
    const clickHandler1 = (payload: any) => console.log('received 1 click event:', payload);
    const clickHandler2 = (payload: any) => console.log('received 2 click event:', payload);
    event.listen('click', clickHandler1);
    event.on('click', clickHandler2);
    event.trigger('click', 'payload testing');
    
    console.log('-----------------------');
    event.trigger('click', 'payload testing');
    //event.remove('click', clickHandler1);
    //event.trigger('click', 'payload testing');
    
}