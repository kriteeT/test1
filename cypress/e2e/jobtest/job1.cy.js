/// <reference types="cypress" />
import '../../support/commands';
Cypress.on('uncaught:exception', (err, runnable) => false);
context('Actions', () => {
  beforeEach(() => {
    cy.visit('https://www.425degree.com');
  });

  it('As a customer I would like to browse through the website to see products that are in each category.', () => {
    cy.wait(3000);
    cy.get('.header-menu-wrap .menu-link').contains('เคส').should('be.visible');
    cy.visit('https://www.425degree.com/case.html');
    cy.location('pathname').should('include', '/case');
    cy.get('#page-title-heading').contains('Case (เคส)').should('be.visible');
    cy.get('#amasty-shopby-product-list .product-items .product-item').should(
      'be.visible'
    );
    cy.wait(300);

    cy.get('.header-menu-wrap .menu-link')
      .contains('ฟิล์มหน้าจอ/เลนส์กล้อง')
      .should('be.visible');
    cy.visit('https://www.425degree.com/screen-protector.html');
    cy.location('pathname').should('include', '/screen-protector');
    cy.get('#page-title-heading')
      .contains('Screen Protector (ฟิล์มกระจก/ฟิล์มกันรอย)')
      .should('be.visible');
    cy.get('[data-sameheight=".product-details,.product-item-details"]').should(
      'be.visible'
    );
    cy.wait(300);

    cy.get('.header-menu-wrap .menu-link')
      .contains('อุปกรณ์เสริม')
      .should('be.visible');
    cy.visit('https://www.425degree.com/accessories.html');
    cy.location('pathname').should('include', '/accessories');
    cy.get('.page-title-wrapper').contains('Accessories').should('be.visible');
  });

  it('As a customer I would quickly access the particular product by searching', () => {
    cy.wait(300);
    cy.get('input[placeholder="ใส่คำค้นหาของคุณที่นี่"]').should('be.visible');
    cy.get('input[placeholder="ใส่คำค้นหาของคุณที่นี่"]')
      .wait(350)
      .first()
      .focus()
      .type('กระจกกันรอย', { waitForAnimations: true })
      .trigger('keydown', {
        key: 'Enter',
      });
    cy.wait(300);
    cy.get('.amsearch-count').contains('(0)').should('not.exist');
  });

  it('As a customer I would add products to the shopping cart and be able to continue shopping.', () => {
    cy.wait(300);
    cy.get('span')
      .contains('คัดแล้วจากทั่วโลกที่ 425°')
      .scrollIntoView()
      .should('be.visible');
    cy.wait(10000);
    cy.get('button[title="เพิ่มในถุงสินค้า"]')
      .first()
      .scrollIntoView()
      .click({ waitForAnimations: true });
    cy.wait(15000);
    cy.get('.modal-content', { timeout: 8000 }).should('be.visible');
    cy.get('.modal-content .total-qty', { timeout: 8000 })
      .contains('1')
      .should('be.visible');
    cy.get('.modal-content button.action.close')
      .contains('เลือกซื้อสินค้าต่อ')
      .should('be.visible');
    cy.get('.modal-content button.action.close').click();
    cy.wait(2000);
    cy.get('button[title="เพิ่มในถุงสินค้า"]')
      .first()
      .scrollIntoView()
      .click({ waitForAnimations: true });
    cy.wait(15000);
    cy.get('.modal-content', { timeout: 8000 }).should('be.visible');
    cy.get('.modal-content .total-qty', { timeout: 8000 })
      .contains('2')
      .should('be.visible');
    cy.get('.modal-content button.action.close').click();
  });

  it('As a customer I would like to update product quantities in the shopping cart.', () => {
    cy.wait(300);
    cy.get('span')
      .contains('คัดแล้วจากทั่วโลกที่ 425°')
      .scrollIntoView()
      .should('be.visible');
    cy.wait(10000);
    cy.get('button[title="เพิ่มในถุงสินค้า"]')
      .first()
      .scrollIntoView()
      .click({ waitForAnimations: true });
    cy.wait(15000);
    cy.get('.modal-content', { timeout: 8000 }).should('be.visible');
    cy.get('.modal-content .total-qty', { timeout: 8000 })
      .contains('1')
      .should('be.visible');
    cy.get('.modal-content button.action.close')
      .contains('เลือกซื้อสินค้าต่อ')
      .should('be.visible');
    cy.get('.modal-content button.action.close').click();
    cy.visit('https://www.425degree.com/checkout/cart/');
    cy.location('pathname').should('include', '/checkout/cart');
    const oldPrice = cy.get('.cart-price .price').first().invoke('text');

    cy.get('.field.qty')
      .first()
      .find('input')
      .should('have.value', '1')
      .clear()
      .type('10')
      .should('have.value', '10');
    cy.get('button.action.update')
      .should('be.visible')
      .click({ waitForAnimations: true });
    cy.wait(600);
    const newPrice = cy.get('.cart-price .price').first().invoke('text');
    expect(oldPrice).not.equal(newPrice);
  });

  it('As a customer I would like to checkout and  it requires membership.', () => {
    cy.get('span')
      .contains('คัดแล้วจากทั่วโลกที่ 425°')
      .scrollIntoView()
      .should('be.visible');
    cy.wait(10000);
    cy.get('button[title="เพิ่มในถุงสินค้า"]')
      .first()
      .scrollIntoView()
      .click({ waitForAnimations: true });
    cy.get('.modal-content button.action.close').click();
    cy.visit('https://www.425degree.com/checkout/');
    cy.location('pathname').should('include', '/checkout');
    cy.get('form.form-login').should('be.visible');
    cy.get('form#co-shipping-form').should('be.visible');
  });

  it('As a customer I would like to choose the payment method and add a new credit card.', () => {
    cy.get('span')
      .contains('คัดแล้วจากทั่วโลกที่ 425°')
      .scrollIntoView()
      .should('be.visible');
    cy.wait(10000);
    cy.get('button[title="เพิ่มในถุงสินค้า"]')
      .first()
      .scrollIntoView()
      .click({ waitForAnimations: true });
    cy.get('.modal-content button.action.close').click();
    cy.visit('https://www.425degree.com/checkout/');
    cy.location('pathname').should('include', '/checkout');
    cy.wait(500);
    cy.get('.payment-method')
      .eq(0)
      .scrollIntoView()
      .should('be.visible')
      .click()
      .should('have.class', '_active')
      .find('.payment-method-content')
      .contains('ชำระด้วยบัตรเครดิต');
    cy.wait(200);
    cy.get('.payment-method')
      .eq(1)
      .scrollIntoView()
      .should('be.visible')
      .click()
      .should('have.class', '_active')
      .find('.payment-method-content')
      .contains('ไวที่สุด! QR payment โอนแล้วไม่ต้องแจ้งชำระเงิน');
    cy.wait(200);
    cy.get('.payment-method')
      .eq(2)
      .scrollIntoView()
      .should('be.visible')
      .click()
      .should('have.class', '_active')
      .find('.payment-method-content')
      .contains('เลขที่บัญชี : 170-2-72420-7');
    cy.wait(200);
    cy.get('.payment-method')
      .eq(3)
      .scrollIntoView()
      .should('be.visible')
      .click()
      .should('have.class', '_active');
  });
});
