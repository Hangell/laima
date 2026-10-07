# Security Policy

This policy covers the Laima npm library, its CLI, and the build and release tooling maintained in this repository.

## Supported versions

Security fixes target the latest stable version published under the npm `latest` tag. Older releases do not receive guaranteed backports; users should upgrade to the latest stable release when a fix is available.

Development branches and prereleases are available for testing and do not have the same support commitment as stable releases. Please report vulnerabilities found in any version and identify the affected release or commit.

## Reporting a vulnerability

Send reports privately to the maintainer, Rodrigo Rangel, at [rodrigo@hangell.org](mailto:rodrigo@hangell.org), using the subject `Laima security report`.

Do not open a public issue or pull request containing an undisclosed vulnerability, exploit, credential, or other sensitive information. The email channel does not provide an encrypted submission mechanism; if your report requires one, first request a suitable way to share the sensitive details.

Include the following when available:

- The affected Laima version or commit, and whether the library, CLI, or release tooling is involved.
- Your Node.js version, operating system, and relevant locale or time zone.
- A description of the vulnerability, its impact, and any required conditions.
- Minimal reproduction steps or a proof of concept using synthetic data.
- Any suggested mitigation or fix, and your preferred contact and attribution details.

You do not need a complete exploit or proposed patch to submit a report. Do not include real secrets or other people's private data. Test only systems and data you own or are authorized to assess.

## Review and disclosure

The maintainer will review the report, request additional information when needed, and assess affected versions and possible mitigations. Response and remediation times depend on maintainer availability and the issue's complexity; there is no guaranteed response deadline.

For a confirmed vulnerability, the maintainer will coordinate a fix and disclosure with the reporter where possible. A release notice or advisory should identify affected versions, the fixed version, and any available mitigation. Reporter credit will be included only with their consent.

Please coordinate public disclosure so users have an opportunity to update. If you have not received a response, follow up through the same private channel.

## Security issues and ordinary bugs

Use the private channel for issues with a security impact, such as unauthorized code execution, exposure of sensitive data, or exploitable behavior affecting availability or the integrity of published packages.

Date calculation errors, formatting differences, time-zone behavior, and compatibility problems without a security impact can be reported through [GitHub issues](https://github.com/Hangell/laima/issues). If you are unsure about the impact, report privately first.

## Contributing security fixes

Follow [CONTRIBUTING](CONTRIBUTING.md) for tests, code quality, and backward compatibility. Coordinate vulnerability-specific patches privately before opening a public pull request. Add regression coverage without exposing sensitive information, and document any necessary compatibility changes and migration steps in the release notes.
