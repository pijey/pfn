import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cervix-feeling-inclining', 'Integration | Component | cervix feeling inclining', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{cervix-feeling-inclining}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#cervix-feeling-inclining}}
      template block text
    {{/cervix-feeling-inclining}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
