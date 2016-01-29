import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cervix-feeling-opening', 'Integration | Component | cervix feeling opening', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{cervix-feeling-opening}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#cervix-feeling-opening}}
      template block text
    {{/cervix-feeling-opening}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
