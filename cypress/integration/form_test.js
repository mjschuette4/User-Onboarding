describe("test our inputs and submit our form", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    })
    it("Add text to inputs and submit form", () => {
        cy  .get('input[name="name"]')
            .type("Matthew")
            .should("have.value", "Matthew");

        cy  .get('input[name="email"]')
            .type("email@email.com")
            .should("have.value", "email@email.com");

        cy  .get("#role")
            .select("Chief Meme Officer")
            .should("have.value", "Chief Meme Officer");

        cy  .get('input[name="password"]')
            .type("qwer1234")
            .should("have.value", "qwer1234");

        cy  .get('[type="checkbox"]')
            .check()
            .should("be.checked");

        cy  .get("button").click();
    })
    it('check validation message on invalid input', () => {
        cy.get('input[name="email"]')
            .type('not_an_email')
        cy.get('.error')
            .should('be_visable')
        cy.get('button')
            .should('be_disabled')
      })
})