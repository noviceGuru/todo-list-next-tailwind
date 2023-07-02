import { rest } from 'msw'
import { Todo } from '@/features/types/todos'

const BASE_URL = process.env.NEXT_PUBLIC_BASE || ""

export const testTodos = {
	initalTodos: [
		{
			"id": 1,
			"task": "write tests"
		},
		{
			"id": 2,
			"task": "make the storybook"
		}
	],

	todosAfterDeleteTodo1: [
		{
			"id": 2,
			"task": "make the storybook"
		}
	],

	todosAfterModifiedRow1: [
		{
			"id": 1,
			"task": "write tests modified"
		},
		{
			"id": 2,
			"task": "make the storybook"
		}
	],

	todosAfterOneRowAdded: [
		{
			"id": 1,
			"task": "write tests"
		},
		{
			"id": 2,
			"task": "make the storybook"
		},
		{
			"id": 3,
			"task": "the third row added"
		}
	]
}

const generateSuccessResponse = (todos: Todo[]) =>
	rest.get(BASE_URL, async (req, res, ctx) =>
		res(
			ctx.status(200),
			ctx.json(todos)
		)
	)

const generateFailureGetResponse = () =>
	rest.get(BASE_URL, async (req, res, ctx) =>
		res(ctx.status(400))
	)

const getSuccesses = Object.fromEntries(
	Object.entries(testTodos)
		.map(e => [`${e[0]}`, generateSuccessResponse(e[1])])
)

export const getFails = Object.fromEntries(
	Object.entries(testTodos)
		.map(e => [`fail_${e[0]}`, generateFailureGetResponse()])
)

export const otherSuccesses = {
	deleteFirstRow: rest.delete(BASE_URL + '/1', async (req, res, ctx) =>
		res(ctx.status(200))
	),
	putFirstRow: rest.put(BASE_URL + '/1', async (req, res, ctx) =>
		res(ctx.status(200))
	),
	addARow: rest.post(BASE_URL, async (req, res, ctx) =>
		res(ctx.status(200))
	)
}
export const otherFails = {
	deleteFirstRowFail: rest.delete(BASE_URL + '/1', async (req, res, ctx) =>
		res(ctx.status(400))
	),
	putFirstRowFail: rest.put(BASE_URL + '/1', async (req, res, ctx) =>
		res(ctx.status(400))
	),
	addARowFail: rest.post(BASE_URL, async (req, res, ctx) =>
		res(ctx.status(400))
	)
}

export const mockApiCallHandlers = { ...getSuccesses, ...getFails, ...otherSuccesses, ...otherFails }

const handlers = Object.entries(mockApiCallHandlers).map(e => e[1])

export default handlers