import React from 'react'
import { Card, CardTitle } from './ui/card'
import Link from 'next/link'
import { MoveUpRight } from 'lucide-react'
import _ from 'lodash'

const InitiativeCard = ({ title, dir }) => {

  return (
    <Link href={`/${dir}/${title}`} >
    <Card className='m-3 p-3 w-full border-2 border-black/10 flex justify-between hover:border-black/20 transition-colors ease-linear'>
    <CardTitle>{_.startCase(title)}</CardTitle>
    <MoveUpRight className='w-6 h-6' />
    </Card>
    </Link>
  )
}

export default InitiativeCard