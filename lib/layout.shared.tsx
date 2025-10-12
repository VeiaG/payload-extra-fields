import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
   nav:{
          title: (
            <div className="flex items-center gap-2">
              <span className="font-bold">PayloadCMS</span>
              <span className="text-muted-foreground">Extra fields</span>
            </div>
          ),
        },
        links:[
            {
                text:'Documentation',
                url:"/docs/",
                active:'none'
            },
            {
                text:'Fields',
                url:"/fields/",
                active:'nested-url',
            }
        ],
        githubUrl:"https://github.com/veiag/payload-extra-fields"
  };
}