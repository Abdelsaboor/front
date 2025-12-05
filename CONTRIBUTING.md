# Contribution Guidelines

## Welcome!

Thank you for considering contributing to the Voice of Silence project. This document provides guidelines and best practices for contributing.

## Code of Conduct

- Be respectful and professional
- Focus on constructive feedback
- Help maintain code quality
- Document your changes

## Development Workflow

### 1. Setup

```bash
git clone <repository-url>
cd front
npm install
npm run dev
```

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 3. Make Changes

- Follow the coding conventions in README.md
- Write clear, descriptive commit messages
- Keep commits focused and atomic
- Test your changes locally

### 4. Code Quality

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Format
npm run format
```

### 5. Submit Pull Request

- Push your branch to GitHub
- Create a Pull Request to `develop`
- Fill out the PR template
- Request review from maintainers

## Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Build process or auxiliary tool changes

### Examples

```
feat(camera): add smooth easing to scene transitions

fix(lighting): correct rim light position for better depth

docs(readme): add 3D asset optimization guide

refactor(scenes): extract common scene logic to hook
```

## Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Code compiles without TypeScript errors
- [ ] No ESLint warnings or errors
- [ ] Code is formatted with Prettier
- [ ] Changes are tested in multiple browsers
- [ ] Documentation is updated if needed
- [ ] Commit messages follow conventions
- [ ] PR description explains the changes
- [ ] No console.log statements left in code
- [ ] Performance impact is considered

## Code Review Process

1. **Automated Checks**: Linting and type-checking run automatically
2. **Peer Review**: At least one maintainer reviews the code
3. **Feedback**: Address any comments or requested changes
4. **Approval**: Once approved, PR can be merged
5. **Merge**: Squash and merge to keep history clean

## Areas for Contribution

### High Priority

- Performance optimizations
- Browser compatibility fixes
- Accessibility improvements
- Documentation enhancements

### Medium Priority

- New scene transitions
- Additional 3D effects
- UI component improvements
- Code refactoring

### Low Priority

- Visual polish
- Animation tweaks
- Developer experience improvements

## Questions?

If you have questions about contributing:

1. Check the README.md first
2. Look at existing code for examples
3. Open a GitHub Discussion
4. Contact the maintainers

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
