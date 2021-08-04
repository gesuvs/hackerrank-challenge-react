import React, { Component } from "react";
import "./index.css";

export default class KanbanBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        { name: 'task 0', stage: 0 },
        { name: 'task 1', stage: 0 },
        { name: 'task 2', stage: 0 },
        { name: 'task 3', stage: 0 },
        { name: 'task 4', stage: 1 },
        { name: 'task 5', stage: 1 },
        { name: 'task 6', stage: 1 },
        { name: 'task 7', stage: 2 },
        { name: 'task 8', stage: 2 },
        { name: 'task 9', stage: 3 },
      ]
    };
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
  }

  componentDidMount(){
    console.log()
  }

  moveToForward = (task) => {
    const stateCopy = [...this.state.tasks];
    const [_, index] = task.name.split(" ");

    for (const s in stateCopy) {
      if (Number(s) === Number(index)) {
        task.stage += 1
      }
    }

    stateCopy[index] = task;
    this.setState({
      tasks: stateCopy
    })
  }

  moveToBack = (task) => {
    const stateCopy = [...this.state.tasks];
    const [_, index] = task.name.split(" ");

    for (const s in stateCopy) {
      if (Number(s) === Number(index)) {
        task.stage -= 1
      }
    }

    stateCopy[index] = task;
    this.setState({
      tasks: stateCopy
    })
  }



  render() {
    const { tasks } = this.state;

    let stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }


    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <div className="mt-50 layout-row">
          {stagesTasks.map((tasks, i) => {
            return (
              <div className="card outlined ml-20 mt-0" key={`${i}`}>
                <div className="card-text">
                  <h4>{this.stagesNames[i]}</h4>
                  <ul className="styled mt-50" data-testid={`stage-${i}`}>
                    {tasks.map((task, index) => {
                      return <li className="slide-up-fade-in" key={`${i}${index}`}>
                        <div className="li-content layout-row justify-content-between align-items-center">
                          <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                          <div className="icons">
                            <button disabled={task.stage === Math.min(this.stagesNames[0].stage)} onClick={() => this.moveToBack(task)} className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`}>
                              <i className="material-icons">arrow_back</i>
                            </button>
                            <button disabled={task.stage === Math.max(this.stagesNames[this.stagesNames.length-1].stage)} onClick={() => this.moveToForward(task)} className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-forward`}>
                              <i className="material-icons">arrow_forward</i>
                            </button>
                          </div>
                        </div>
                      </li>
                    })}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}