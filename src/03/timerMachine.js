import { createMachine, assign } from 'xstate'

const initialContext = {
  duration: 60,
  elapsed: 0,
  interval: 0.1,
}

const tick = assign({
  elapsed: (ctx) => ctx.elapsed + ctx.interval,
})
const addMinute = assign({
  duration: (ctx) => ctx.duration + 60,
})
const reset = assign(initialContext)

export const timerMachine = createMachine(
  {
    initial: 'idle',
    context: initialContext,
    states: {
      idle: {
        entry: ['reset'],
        on: {
          TOGGLE: 'running',
        },
      },
      running: {
        on: {
          TICK: {
            actions: ['tick'],
          },
          TOGGLE: 'paused',
          ADD_MINUTE: {
            actions: ['addMinute'],
          },
        },
      },
      paused: {
        on: {
          TOGGLE: 'running',
          RESET: {
            target: 'idle',
          },
        },
      },
    },
  },
  {
    actions: {
      tick,
      addMinute,
      reset,
    },
  }
)
