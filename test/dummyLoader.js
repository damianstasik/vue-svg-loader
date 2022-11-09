export default function loader(source) {
  return `export default ${JSON.stringify(source)}`;
}