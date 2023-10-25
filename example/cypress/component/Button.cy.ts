/* eslint-disable no-unused-expressions */
import Button, { ButtonSize, ButtonType } from '@eazy-ui-next/components/src/button/index'

describe('Button.cy.ts', () => {
  it('should slots work', () => {
    cy.mount(Button, {
      props: {
        type: 'default',
        // size: 'large',
      },
      slots: {
        default: 'btn',
      },
    })

    cy.get('.ez-button').should('have.text', 'btn')
  })

  it('should disabled work', () => {
    let hasClick = false
    const handleClick = () => {
      hasClick = true
    }

    cy.mount(Button, {
      props: {
        type: 'default',
        onClick: handleClick,
        disabled: true,
      },
      slots: {
        default: 'btn',
      },
    })

    cy.get('.ez-button').should('have.css', 'cursor', 'not-allowed')
    cy.get('.ez-button').should('have.class', `ez-button--disabled`)
    cy.get('.ez-button').click().should(() => {
      expect(hasClick).to.be.false
    })
  })

  it('should onClick work', () => {
    let hasClick = false
    const handleClick = () => {
      hasClick = true
    }

    cy.mount(Button, {
      props: {
        type: 'default',
        onClick: handleClick,
      },
      slots: {
        default: 'btn',
      },
    })

    cy.get('.ez-button').click().should(() => {
      expect(hasClick).to.be.true
    })
  })

  it('should round work', () => {
    cy.mount(Button, {
      props: {
        round: true,
      },
      slots: {
        default: 'btn',
      },
    })

    cy.get('.ez-button').should('have.class', `ez-button--round`)
    cy.get('.ez-button').should('have.css', 'border-radius', '999px')
  })

  describe('test type', () => {
    const types = ButtonType

    for (const type of types) {
      it(`should test button with type ${type}`, () => {
        // 挂载组件
        cy.mount(Button, {
          props: {
            type,
          },
          slots: {
            default: 'btn',
          },
        })

        cy.get('.ez-button').should('have.class', `ez-button--${type}`)
      })
    }
  })

  describe('test size', () => {
    const sizes = ButtonSize

    for (const size of sizes) {
      it(`should test button with size ${size}`, () => {
        // 挂载组件
        cy.mount(Button, {
          props: {
            size,
          },
          slots: {
            default: 'btn',
          },
        })

        cy.get('.ez-button').should('have.class', `ez-button--${size}`)
      })
    }
  })
})
