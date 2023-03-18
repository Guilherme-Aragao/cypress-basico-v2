Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Guilherme')
        cy.get('#lastName').type('Aragão')
        cy.get('#email').type('guilhermearagao2001@hotmail.com')
         cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
})