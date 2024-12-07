import type { AstroIntegration } from 'astro';

export default function class_to_class_name(): AstroIntegration {
  return {
    name: 'class-to-classname',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          vite: {
            plugins: [{
              name: 'class-to-classname',
              enforce: 'pre',
              transform(code: string, id: string) {

                if (!id.endsWith('.jsx') && !id.endsWith('.tsx')) {
                  return null;
                }

                const classAttrRegex = /\bclass=(?:["'`]{|{|["'`])/g;

                if (!classAttrRegex.test(code)) {
                  return null;
                }

                return {
                  code: code.replace(/\bclass=(?=["'`]{|{|["'`])/g, 'className='),
                  map: null
                };
              }
            }]
          }
        });
      }
    }
  };
}
