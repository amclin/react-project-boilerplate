module.exports = plop => {
  const templates = '../templates'

  // Looks for '/' in the path and returns
  // relative ../ of the same number
  plop.addHelper('relativeSegments', (path) => {
    const count = (path.match(/\//g) || []).length
    const relPath = new Array(count).fill('../', 0, count).join('')
    // eslint-disable-next-line no-console
    console.debug(`${count} segments found in path`)
    // eslint-disable-next-line no-console
    console.debug(`prefixing with ${relPath}`)
    return relPath
  })

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
      }
    ],
  });
  plop.setGenerator('page', {
    description: 'Create a new page',
    prompts: [
      {
        type: 'input',
        name: 'pageName',
        message: 'SEO-friendly page title? (do not include app name)',
        default: 'My Example Page'
      },
      {
        type: 'input',
        name: 'pagePath',
        message: 'URL to page? (Start from the first slash and leave off http://example.com and index.html)',
        default: 'example/my-example-page'
      }
    ],
    actions: [
      // Add the page template
      {
        type: 'add',
        path: 'src/pages/{{lowerCase pagePath}}/index.jsx',
        templateFile: `${templates}/pages/index.jsx.hbs`,
      },
      // Add the unit test file
      {
        type: 'add',
        path: 'src/__tests__/pages/{{lowerCase pagePath}}/index.test.jsx',
        templateFile: `${templates}/pages/index.test.jsx.hbs`,
      }
    ]
  })
}
