React and redux testing workflow

Install the dependencies: 
  npm i

Install Enzyme, its adaptor, and react-test-renderer: 
  npm install --save-dev enzyme enzyme enzyme-adapter-react-16 react-test-renderer

Configure Enzyme by adding the following code to src/setupTests.js:

  import Enzyme from 'enzyme';
  import Adapter from 'enzyme-adapter-react-16';

  Enzyme.configure({ adapter: new Adapter() });

Run `npm test` to start Jest. This will watch for new tests or updates to existing ones and re-run the tests automatically when you save.

Begin writing tests.