import React from 'react';
import './_notifications.scss';

const INTERVALS = 20000;

const formatTime = date => {
    let hour = date.getHours();
    let min = date.getMinutes();

    if (hour < 10) { hour = '0'+hour }
    if (min < 10) { min = '0'+min }

    return hour+':'+min;
}

class Time extends React.Component {
    state = {
        time: this.props.time? new Date(this.props.time) : new Date(),
    }

    componentWillMount() {
        if (!this.props.fixedTime) {
            this.timerId = setInterval(() => {
                this.getDate();
            }, INTERVALS);
        }
    }

    componentWillUnmount() {
        if(this.timerId) {
            clearInterval(this.timerId);
        }
    }

    getDate() {
        this.setState({ time: new Date(this.state.time.getTime() + INTERVALS) });
    }

    render() {
        return (
            <div className="taskbar-notifications__time">
                { formatTime(this.state.time) }
            </div>
        );
    }
}

const Notifications = props => (
    <div className="taskbar-notifications">
        <Time />
    </div>
)

export default Notifications;