'use babel';

import NuclideMochaTestRunnerView from './nuclide-mocha-test-runner-view';
import { CompositeDisposable } from 'atom';

export default {

  nuclideMochaTestRunnerView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.nuclideMochaTestRunnerView = new NuclideMochaTestRunnerView(state.nuclideMochaTestRunnerViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.nuclideMochaTestRunnerView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'nuclide-mocha-test-runner:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.nuclideMochaTestRunnerView.destroy();
  },

  serialize() {
    return {
      nuclideMochaTestRunnerViewState: this.nuclideMochaTestRunnerView.serialize()
    };
  },

  toggle() {
    console.log('NuclideMochaTestRunner was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
