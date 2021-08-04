import React from 'react';
import App from './App';
import { render, fireEvent, cleanup } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

const renderApp = () => render(<App/>);

afterEach(() => {
	cleanup()
});

// elements in App by data-testids
const testIds = {
	stages: ['stage-0', 'stage-1', 'stage-2', 'stage-3'],
};

test('For each task in stage 0 and stage 1, backward and forward buttons are correctly enabled/disabled', () => {
	const tasks = [
		{ name: 'task 1', stage: 0 },
		{ name: 'task 2', stage: 0 },
		{ name: 'task 3', stage: 0 },
		{ name: 'task 4', stage: 1 },
		{ name: 'task 5', stage: 1 },
		{ name: 'task 6', stage: 1 },
		{ name: 'task 7', stage: 2 },
		{ name: 'task 8', stage: 2 },
		{ name: 'task 9', stage: 3 },
		{ name: 'task 10', stage: 3 },
	];
	
	const renderApp = () => render(<App tasks={tasks}/>);
  	const { getByTestId } = renderApp();

	const backlogStage = getByTestId(testIds.stages[0]);
    expect(backlogStage.children.length).toEqual(3);

    expect(backlogStage.contains(getByTestId('task-1-name'))).toBe(true);
    expect(backlogStage.contains(getByTestId('task-2-name'))).toBe(true);
    expect(backlogStage.contains(getByTestId('task-3-name'))).toBe(true);

    expect(getByTestId('task-1-name').innerHTML).toBe('task 1');
    expect(getByTestId('task-1-back').hasAttribute('disabled')).toEqual(true);
    expect(getByTestId('task-1-forward').hasAttribute('disabled')).toBeFalsy();

    expect(getByTestId('task-2-name').innerHTML).toBe('task 2');
    expect(getByTestId('task-2-back').hasAttribute('disabled')).toEqual(true);
    expect(getByTestId('task-2-forward').hasAttribute('disabled')).toBeFalsy();

    expect(getByTestId('task-3-name').innerHTML).toBe('task 3');
    expect(getByTestId('task-3-back').hasAttribute('disabled')).toEqual(true);
    expect(getByTestId('task-3-forward').hasAttribute('disabled')).toBeFalsy();

    const toDoStage = getByTestId(testIds.stages[1]);

    expect(toDoStage.children.length).toBe(3);
    expect(toDoStage.contains(getByTestId('task-4-name'))).toBe(true);
    expect(toDoStage.contains(getByTestId('task-5-name'))).toBe(true);
    expect(toDoStage.contains(getByTestId('task-6-name'))).toBe(true);

    expect(getByTestId('task-4-name').innerHTML).toBe('task 4');
    expect(getByTestId('task-4-back').hasAttribute('disabled')).toBeFalsy();
    expect(getByTestId('task-4-forward').hasAttribute('disabled')).toBeFalsy();

    expect(getByTestId('task-5-name').innerHTML).toBe('task 5');
    expect(getByTestId('task-5-back').hasAttribute('disabled')).toBeFalsy();
    expect(getByTestId('task-5-forward').hasAttribute('disabled')).toBeFalsy();

    expect(getByTestId('task-6-name').innerHTML).toBe('task 6');
    expect(getByTestId('task-6-back').hasAttribute('disabled')).toBeFalsy();
    expect(getByTestId('task-6-forward').hasAttribute('disabled')).toBeFalsy();
});

test('For each task in stage 2 and stage 3, backward and forward buttons are correctly enabled/disabled', () => {
	const tasks = [
		{ name: 'task 1', stage: 0 },
		{ name: 'task 2', stage: 0 },
		{ name: 'task 3', stage: 0 },
		{ name: 'task 4', stage: 1 },
		{ name: 'task 5', stage: 1 },
		{ name: 'task 6', stage: 1 },
		{ name: 'task 7', stage: 2 },
		{ name: 'task 8', stage: 2 },
		{ name: 'task 9', stage: 3 },
		{ name: 'task 10', stage: 3 },
	];
	
	const renderApp = () => render(<App tasks={tasks}/>);
  	const { getByTestId } = renderApp();

	const onGoingStage = getByTestId(testIds.stages[2]);

	expect(onGoingStage.children.length).toBe(2);
	expect(onGoingStage.contains(getByTestId('task-7-name'))).toBe(true);
	expect(onGoingStage.contains(getByTestId('task-8-name'))).toBe(true);

	expect(getByTestId('task-7-name').innerHTML).toBe('task 7');
	expect(getByTestId('task-8-back').hasAttribute('disabled')).toBeFalsy();
	expect(getByTestId('task-8-forward').hasAttribute('disabled')).toBeFalsy();

	expect(getByTestId('task-8-name').innerHTML).toBe('task 8');
	expect(getByTestId('task-8-back').hasAttribute('disabled')).toBeFalsy();
	expect(getByTestId('task-8-forward').hasAttribute('disabled')).toBeFalsy();

	const doneStage = getByTestId(testIds.stages[3]);

	expect(doneStage.children.length).toBe(2);
	expect(doneStage.contains(getByTestId('task-9-name'))).toBe(true);
	expect(doneStage.contains(getByTestId('task-10-name'))).toBe(true);

	expect(getByTestId('task-9-name').innerHTML).toBe('task 9');
	expect(getByTestId('task-9-back').hasAttribute('disabled')).toBeFalsy();
	expect(getByTestId('task-9-forward').hasAttribute('disabled')).toEqual(true);

	expect(getByTestId('task-10-name').innerHTML).toBe('task 10');
	expect(getByTestId('task-10-back').hasAttribute('disabled')).toBeFalsy();
	expect(getByTestId('task-10-forward').hasAttribute('disabled')).toEqual(true);
});

test('For a task in stage 0, can be moved forward till stage 4 and buttons are correctly enabled and disabled in stage 4', () => {
	const tasks = [
		{ name: 'task 1', stage: 0 },
		{ name: 'task 2', stage: 0 },
		{ name: 'task 3', stage: 0 },
		{ name: 'task 4', stage: 1 },
		{ name: 'task 5', stage: 1 },
		{ name: 'task 6', stage: 1 },
		{ name: 'task 7', stage: 2 },
		{ name: 'task 8', stage: 2 },
		{ name: 'task 9', stage: 3 },
		{ name: 'task 10', stage: 3 },
	];
	
	const renderApp = () => render(<App tasks={tasks}/>);
	const { getByTestId } = renderApp();

	const backlogStage = getByTestId(testIds.stages[0]);
	const toDoStage = getByTestId(testIds.stages[1]);
	const onGoingStage = getByTestId(testIds.stages[2]);
	const doneStage = getByTestId(testIds.stages[3]);

	const taskName = 'task 1';
    const taskId = `${taskName.split(' ').join('-')}-name`;
    const taskForwardIconId = `${taskName.split(' ').join('-')}-forward`;

    expect(backlogStage.contains(getByTestId(taskId))).toBe(true);
    expect(toDoStage.contains(getByTestId(taskId))).toBe(false);
    expect(onGoingStage.contains(getByTestId(taskId))).toBe(false);
    expect(doneStage.contains(getByTestId(taskId))).toBe(false);

	fireEvent.click(getByTestId(taskForwardIconId));

    expect(backlogStage.contains(getByTestId(taskId))).toBe(false);
    expect(toDoStage.contains(getByTestId(taskId))).toBe(true);
    expect(onGoingStage.contains(getByTestId(taskId))).toBe(false);
    expect(doneStage.contains(getByTestId(taskId))).toBe(false);

    fireEvent.click(getByTestId(taskForwardIconId));

    expect(backlogStage.contains(getByTestId(taskId))).toBe(false);
    expect(toDoStage.contains(getByTestId(taskId))).toBe(false);
    expect(onGoingStage.contains(getByTestId(taskId))).toBe(true);
    expect(doneStage.contains(getByTestId(taskId))).toBe(false);

	fireEvent.click(getByTestId(taskForwardIconId));
	
    expect(backlogStage.contains(getByTestId(taskId))).toBe(false);
    expect(toDoStage.contains(getByTestId(taskId))).toBe(false);
    expect(onGoingStage.contains(getByTestId(taskId))).toBe(false);
    expect(doneStage.contains(getByTestId(taskId))).toBe(true);
    expect(getByTestId('task-1-back').hasAttribute('disabled')).toBeFalsy();
    expect(getByTestId('task-1-forward').hasAttribute('disabled')).toEqual(true);
});

test('For a task in stage 4, can be moved backward till stage 0 and check for buttons are enabled/disabled correctly', () => {
	const tasks = [
		{ name: 'task 1', stage: 0 },
		{ name: 'task 2', stage: 0 },
		{ name: 'task 3', stage: 0 },
		{ name: 'task 4', stage: 1 },
		{ name: 'task 5', stage: 1 },
		{ name: 'task 6', stage: 1 },
		{ name: 'task 7', stage: 2 },
		{ name: 'task 8', stage: 2 },
		{ name: 'task 9', stage: 3 },
		{ name: 'task 10', stage: 3 },
	];
	
	const renderApp = () => render(<App tasks={tasks}/>);
	const { getByTestId } = renderApp();

	const backlogStage = getByTestId(testIds.stages[0]);
	const toDoStage = getByTestId(testIds.stages[1]);
	const onGoingStage = getByTestId(testIds.stages[2]);
	const doneStage = getByTestId(testIds.stages[3]);

	const taskName = 'task 9';
    const taskId = `${taskName.split(' ').join('-')}-name`;
	const taskBackIconId = `${taskName.split(' ').join('-')}-back`;
	
	expect(backlogStage.contains(getByTestId(taskId))).toBe(false);
    expect(toDoStage.contains(getByTestId(taskId))).toBe(false);
    expect(onGoingStage.contains(getByTestId(taskId))).toBe(false);
    expect(doneStage.contains(getByTestId(taskId))).toBe(true);

	fireEvent.click(getByTestId(taskBackIconId));

    expect(backlogStage.contains(getByTestId(taskId))).toBe(false);
    expect(toDoStage.contains(getByTestId(taskId))).toBe(false);
    expect(onGoingStage.contains(getByTestId(taskId))).toBe(true);
    expect(doneStage.contains(getByTestId(taskId))).toBe(false);

    fireEvent.click(getByTestId(taskBackIconId));

    expect(backlogStage.contains(getByTestId(taskId))).toBe(false);
    expect(toDoStage.contains(getByTestId(taskId))).toBe(true);
    expect(onGoingStage.contains(getByTestId(taskId))).toBe(false);
    expect(doneStage.contains(getByTestId(taskId))).toBe(false);

	fireEvent.click(getByTestId(taskBackIconId));
	
    expect(backlogStage.contains(getByTestId(taskId))).toBe(true);
    expect(toDoStage.contains(getByTestId(taskId))).toBe(false);
    expect(onGoingStage.contains(getByTestId(taskId))).toBe(false);
    expect(doneStage.contains(getByTestId(taskId))).toBe(false);

    expect(getByTestId('task-9-back').hasAttribute('disabled')).toEqual(true);
    expect(getByTestId('task-1-forward').hasAttribute('disabled')).toBeFalsy();

});

test('after many forward and back operations, tasks are in correct state', () => {
	const tasks = [
		{ name: 'task 1', stage: 0 },
		{ name: 'task 2', stage: 0 },
		{ name: 'task 3', stage: 0 },
		{ name: 'task 4', stage: 1 },
		{ name: 'task 5', stage: 1 },
		{ name: 'task 6', stage: 1 },
		{ name: 'task 7', stage: 2 },
		{ name: 'task 8', stage: 2 },
		{ name: 'task 9', stage: 3 },
		{ name: 'task 10', stage: 3 },
	];
	
	const renderApp = () => render(<App tasks={tasks}/>);
	const { getByTestId } = renderApp();

	fireEvent.click(getByTestId(`task-1-forward`));
	fireEvent.click(getByTestId(`task-2-forward`));
	fireEvent.click(getByTestId(`task-4-forward`));
	fireEvent.click(getByTestId(`task-5-forward`));
	fireEvent.click(getByTestId(`task-6-back`));
	fireEvent.click(getByTestId(`task-7-forward`));
	fireEvent.click(getByTestId(`task-8-back`));
	fireEvent.click(getByTestId(`task-9-back`));
	fireEvent.click(getByTestId(`task-10-back`));

	const backlogStage = getByTestId(testIds.stages[0]);
	const toDoStage = getByTestId(testIds.stages[1]);
	const onGoingStage = getByTestId(testIds.stages[2]);
	const doneStage = getByTestId(testIds.stages[3]);
	
	expect(backlogStage.children.length).toBe(2);
    expect(backlogStage.contains(getByTestId('task-3-name'))).toBe(true);
    expect(backlogStage.contains(getByTestId('task-6-name'))).toBe(true);

    expect(toDoStage.children.length).toBe(3);
    expect(toDoStage.contains(getByTestId('task-1-name'))).toBe(true);
    expect(toDoStage.contains(getByTestId('task-2-name'))).toBe(true);
    expect(toDoStage.contains(getByTestId('task-8-name'))).toBe(true);

    expect(onGoingStage.children.length).toBe(4);
    expect(onGoingStage.contains(getByTestId('task-4-name'))).toBe(true);
    expect(onGoingStage.contains(getByTestId('task-5-name'))).toBe(true);
    expect(onGoingStage.contains(getByTestId('task-9-name'))).toBe(true);
    expect(onGoingStage.contains(getByTestId('task-10-name'))).toBe(true);

    expect(doneStage.children.length).toBe(1);
    expect(doneStage.contains(getByTestId('task-7-name'))).toBe(true);
});