module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // Tính năng mới
        'fix', // Sửa lỗi
        'docs', // Thay đổi tài liệu
        'style', // Thay đổi không ảnh hưởng đến code (format, dấu chấm phẩy, etc)
        'refactor', // Refactor code
        'perf', // Cải thiện hiệu suất
        'test', // Thêm hoặc sửa tests
        'build', // Thay đổi build system hoặc dependencies
        'ci', // Thay đổi CI configuration
        'chore', // Các thay đổi khác không sửa src hoặc test files
        'revert', // Revert commit trước đó
      ],
    ],
    'subject-case': [0], // Cho phép bất kỳ case nào cho subject
  },
};
