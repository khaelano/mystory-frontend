import type { ReactNode } from 'react'

interface TableProps {
  children: ReactNode
  className?: string
}

interface TableSectionProps {
  children: ReactNode
  className?: string
}

interface TableCellProps {
  children: ReactNode
  className?: string
  colSpan?: number
}

function TableRoot({ children, className = '' }: TableProps) {
  return (
    <div className={`border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      <table className="w-full">{children}</table>
    </div>
  )
}

function TableHeader({ children, className = '' }: TableSectionProps) {
  return (
    <thead className={`bg-gray-50 border-b border-gray-200 ${className}`}>
      {children}
    </thead>
  )
}

function TableBody({ children, className = '' }: TableSectionProps) {
  return <tbody className={className}>{children}</tbody>
}

function TableRow({ children, className = '' }: TableSectionProps) {
  return (
    <tr className={`border-b border-gray-100 last:border-b-0 hover:bg-gray-50 ${className}`}>
      {children}
    </tr>
  )
}

function TableHeaderCell({ children, className = '' }: TableCellProps) {
  return (
    <th className={`px-4 py-3 text-left text-sm font-medium text-gray-700 ${className}`}>
      {children}
    </th>
  )
}

function TableCell({ children, className = '', colSpan }: TableCellProps) {
  return (
    <td className={`px-4 py-4 text-sm ${className}`} colSpan={colSpan}>
      {children}
    </td>
  )
}

export const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  HeaderCell: TableHeaderCell,
  Cell: TableCell,
})
