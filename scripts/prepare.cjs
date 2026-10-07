if (
  process.env.HUSKY !== '0' &&
  !process.env.CI &&
  require('node:fs').existsSync('.git')
) {
  try {
    require('node:child_process').execFileSync(
      process.execPath,
      [
        require('node:path').join(
          require('node:path').dirname(require.resolve('husky')),
          'bin.js',
        ),
      ],
      { stdio: 'inherit' },
    );
  } catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') throw error;
  }
}
