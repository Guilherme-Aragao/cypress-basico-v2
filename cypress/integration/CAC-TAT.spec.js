

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
    cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
     cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preencha os campos obrigatórios e envia o formulario', function(){
        const longTexte = 'Todos os campos devem ser preenchidos obrigatoriamente, e o ultimo é preenchido sem nenhum delay'
        cy.get('#firstName').type('Guilherme')
        cy.get('#lastName').type('Aragão')
        cy.get('#email').type('guilhermearagao2001@hotmail.com')
         cy.get('#open-text-area').type(longTexte, { delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })
    
    it('exibir mensagem de erro ao submeter o formulário com uma email com formatação inválida', function(){
        cy.get('#firstName').type('Helen')
        cy.get('#lastName').type('Cristina')
        cy.get('#email').type('guilhermearagao2001hotmail.com')
         cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible').git
    })
    
    it('campo telefone continuar vazio quando preenchido com valor não-numérico', function(){
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('exibe mensagem de erro qunando o telefone de torna obrigatório mais não é preenchido', function(){
        cy.get('#firstName').type('Juliana')
        cy.get('#lastName').type('Gama')
        cy.get('#email').type('guilhermearagao2001@hotmail.com')
        cy.get('#phone-checkbox'). click()
         cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email, telefone', function(){
       cy.get('#firstName')
        .type('Guilherme')
        .should('have.value', 'Guilherme')
        .clear()
        .should('have.value', '')

        cy.get('#lastName')
        .type('Aragão')
        .should('have.value', 'Aragão')
        .clear()
        .should('have.value', '')

        cy.get('#email')
        .type('guilhermearagao2001@hotmail.com')
        .should('have.value', 'guilhermearagao2001@hotmail.com')
        .clear()
        .should('have.value', '')

        cy.get('#phone')
        .type('00999999999')
        .should('have.value', '00999999999')
        .clear()
        .should('have.value', '')

        cy.get('#open-text-area')
        .type('Teste')
        .should('have.value', 'Teste')
        .clear()
        .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formulario com sucesso usando comandos customizados', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (Youtube) por seu texto', function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
        .select('Mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu indice', function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimentos "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
         .should('have.length', 3) 
         .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
         })
    })

    it('marca ambos checkboxes, depois desmarca o ultimo', function(){
       cy.get('input[type="checkbox"]').check()
       .check()
       .should('be.checked')
       .last() 
       .uncheck()
       .should('not.be.checked') 
       
    })

    it('seleciona um novo arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando drag-and-drop', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
          .selectFile('@sampleFile') 
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
           })
    })

    it('verifica que a politica de privacidade abre em outra aba sem a nescessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página de politica de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')

    })
    })
  
  