/* eslint-disable no-unused-expressions */
import Input from '@eazy-ui-next/components/src/input/index'
import { ref } from 'vue'

describe('Input.cy.ts', () => {
  it('should v-model:value work', () => {
    const onUpdateValue = cy.stub()

    cy.mount(Input, {
      props: {
        'value': 'test',
        'onUpdate:value': onUpdateValue,
      },
    })

    const $el = cy.get('.ez-input').find('input')

    $el.should('have.value', 'test')

    $el.type('1').should(($input) => {
      expect($input).to.have.value('test1')
      expect(onUpdateValue).to.be.called
      expect(onUpdateValue).calledWith('test1')
    })
  })

  it('should placeholder work', () => {
    const placeholder = 'test placeholder'
    const inputValue = ref('')
    const handleInput = (newVal: string) => {
      inputValue.value = newVal
    }
    cy.mount(Input, {
      props: {
        'value': inputValue.value,
        'onUpdate:value': handleInput,
        placeholder,
      },
    })

    //  输入后placeholder消失
    const $placeholder = cy.get('.ez-input--placeholder')
    $placeholder.should('have.text', placeholder)
    const $el = cy.get('.ez-input input')
    $el.type('1').then(() => {
      $placeholder.should('not.exist')
    })
  })

  it('should onChange work', () => {
    const handleChange = cy.stub()

    cy.mount(Input, {
      props: {
        value: 'test',
        onChange: handleChange,
      },
    })

    const $el = cy.get('.ez-input').find('input')

    $el.should('have.value', 'test')

    $el.type('123').then(() => {
      $el.blur().then(() => {
        expect(handleChange).calledWith('test123')
      })
    })
  })

  it('should disabled work', () => {
    cy.mount(Input, {
      props: {
        value: 'test',
        disabled: true,
      },
    })

    const $el = cy.get('.ez-input').find('input')
    $el.should('have.value', 'test')

    $el.should('be.disabled')
  })
})
