import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cervix-feeling-sensation', 'Integration | Component | cervix feeling sensation', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{cervix-feeling-sensation}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#cervix-feeling-sensation}}
      template block text
    {{/cervix-feeling-sensation}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
