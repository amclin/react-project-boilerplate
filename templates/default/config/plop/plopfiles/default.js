module.exports = plop => {
  const templates = '../templates'
  plop.setGenerator('component', {
    description: 'Create a component',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // List of options
        type: 'list',
        // Variable name for this input
        name: 'atomicType',
        // Prompt to display on command line
        message: 'What level is this component?',
        choices: [
          'atom',
          'molecule',
          'organism'
        ]
      },
      {
        type: 'input',
        name: 'componentName',
        message: 'Name of component?'
      },
      {
        type: 'input',
        name: 'componentDescription',
        message: 'Short description of the component (eg: `a list of names`):'
      }
    ],
    actions: [
      // Add the component index
      {
        type: 'add',
        path: 'src/components/{{atomicType}}s/{{properCase componentName}}/index.js',
        templateFile: `${templates}/components/{{atomicType}}/index.js.hbs`,
      },
      // Add the component file
      {
        type: 'add',
        path: 'src/components/{{atomicType}}s/{{properCase componentName}}/{{properCase componentName}}.jsx',
        templateFile: `${templates}/components/{{atomicType}}/{{properCase atomicType}}.jsx.hbs`,
      },
      // Add the unit test file
      {
        type: 'add',
        path: 'src/components/{{atomicType}}s/{{properCase componentName}}/{{properCase componentName}}.test.jsx',
        templateFile: `${templates}/components/{{atomicType}}/{{properCase atomicType}}.test.jsx.hbs`,
      },
    ],
  });
};
