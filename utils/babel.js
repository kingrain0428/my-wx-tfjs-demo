export const generator = (code) => {
  const ast = tokenizer(code);
  let result = '', arrNum = [], arrOperator = [];
  console.log(ast)
  for (let item of ast) {
    if (item.type === "number") {
      arrNum.push(item.value);
      continue
    }
    if (item.type === "operator") {
      arrOperator.push(item.value)
      continue
    }
  }
  for (let i = 0; i < arrNum.length - 1; i++) {
    if (!result) {
      result = arrNum[i];
    }
    if (arrNum[i + 1]) {
      result = figure(result, arrNum[i + 1], arrOperator[i])
    }
  }
  return result
}

const figure = (arg1, arg2, arg3) => {
  arg1 = parseInt(arg1, 10);
  arg2 = parseInt(arg2, 10);
  let result = '';
  switch(arg3) {
    case '+':
      result = arg1 + arg2
      break;
    case '-':
      result = arg1 - arg2
      break;
    case '*':
      result = arg1 * arg2
      break;
    case '/':
      result = arg1 / arg2
      break;
  }
  return result;
}

// 词法分析器,接收字符串返回token数组
export const tokenizer = (code) => {

  // 储存 token 的数组
  const tokens  = [];

  // 指针
  let current = 0;

  while (current < code.length) {
      // 获取指针指向的字符
      const char = code[current];

      // 我们先处理单字符的语法单元 类似于`;` `(` `)`等等这种
      if (char === '(' || char === ')'|| char === '{' || char === '}') {
          tokens.push({
              type: 'parens',
              value: char,
          });

          current ++;

          continue;
      }

      // 我们接着处理标识符,标识符一般为以字母、_、$开头的连续字符
      if (/[a-zA-Z\$\_]/.test(char)) {
          let value = '';
          value += char;
          current ++;

          // 如果是连续字那么将其拼接在一起,随后指针后移
          while (/[a-zA-Z0-9\$\_]/.test(code[current]) && current < code.length) {
              value += code[current];
              current ++;
          }
          tokens.push({
              type: 'identifier',
              value,
          });

          continue;
      }

      if (/[0-9]/.test(char)) {
        let value = '';
        value += char;
        current ++;
        // 如果是连续字那么将其拼接在一起,随后指针后移
        while (/[0-9]/.test(code[current]) && current < code.length) {
          value += code[current];
          current ++;
        }
        tokens.push({
            type: 'number',
            value,
        });

        continue;
      }


      // 处理空白字符
      if (/\s/.test(char)) {
          let value = '';
          value += char;
          current ++;

          //道理同上
          while (/\s]/.test(code[current]) && current < code.length) {
              value += code[current];
              current ++;
          }

          // tokens.push({
          //     type: 'whitespace',
          //     value,
          // });

          continue;
      }


      // 处理逗号分隔符
      if (/,/.test(char)) {

          tokens.push({
              type: ',',
              value: ',',
          });

          current ++;
          continue;
      }

      // 处理运算符
      if (/=|\+|\*|\-|\\|>/.test(char)) {
          let value = '';
          value += char;
          current ++;

          while (/=|\+|>/.test(code[current])) {
              value += code[current];
              current ++;
          }

          // 当 = 后面有 > 时为箭头函数而非运算符
          if (value === '=>') {
              tokens.push({
                  type: 'ArrowFunctionExpression',
                  value,
              });
              continue;
          }

          tokens.push({
              type: 'operator',
              value,
          });

          continue;
      }

      // 如果碰到我们词法分析器以外的字符,则报错
      throw new TypeError('I dont know what this character is: ' + char);
  }

  return tokens;
};