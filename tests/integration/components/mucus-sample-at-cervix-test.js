import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mucus-sample-at-cervix', 'Integration | Component | mucus sample at cervix', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{mucus-sample-at-cervix}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#mucus-sample-at-cervix}}
      template block text
    {{/mucus-sample-at-cervix}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
