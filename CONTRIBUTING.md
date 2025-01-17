# Contributing to mama-cli

Thank you for your interest in contributing to mama-cli! We're excited to have you help make this project better.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/mama-cli.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`

## Development Setup

1. Link the package locally:
```bash
npm link
```

2. Test your changes:
```bash
mama -h
```

## Adding New Features

When adding new features to mama-cli:

1. Ensure the feature aligns with the project's goal of simplifying React component generation
2. Add appropriate tests for your new feature
3. Update documentation to reflect the changes
4. Follow the existing code style and patterns

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update the package version following semantic versioning
3. Ensure your code passes all tests
4. Create a pull request with a clear description of the changes
5. Wait for review from maintainers

## Commit Message Guidelines

Please follow these guidelines for commit messages:

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

Example format:
```
feat: add new template option for functional components

- Add support for functional component templates
- Include TypeScript interface generation
- Update documentation
```

## Code Style

* Use 2 spaces for indentation
* Follow JavaScript Standard Style
* Use meaningful variable names
* Add comments for complex logic
* Keep functions small and focused

## Questions or Problems?

Feel free to create an issue if you:

* Have questions about contributing
* Found a bug
* Want to propose a new feature
* Need help with your contribution

## License

By contributing to mama-cli, you agree that your contributions will be licensed under the same license as the project.