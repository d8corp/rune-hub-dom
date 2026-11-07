import type { FlexProps } from '../../../ui'
import { Box, Card, CardContent, CardHeader, Flex, Markdown, Typography } from '../../../ui'
import { inject } from '../../../utils'

export type ViewProps = FlexProps

export function View ({ title, ...props }: ViewProps) {
  return (
    <Card {...props}>
      <CardHeader>
        <Flex gap={6}>
          <Box color='danger' circle size='xs' />
          <Box color='warning' circle size='xs' />
          <Box color='success' circle size='xs' />
        </Flex>
        <Typography flex>
          <Markdown text={inject(title, (title = '') => title)} />
        </Typography>
      </CardHeader>
      <CardContent>
        <div>
          {props.children}
        </div>
      </CardContent>
    </Card>
  )
}
