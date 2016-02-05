import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cervix-feeling-position', 'Integration | Component | cervix feeling position', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{cervix-feeling-position}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#cervix-feeling-position}}
      template block text
    {{/cervix-feeling-position}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});