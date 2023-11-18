import {
  Claimed as ClaimedEvent,
  DisasterRegistered as DisasterRegisteredEvent,
  OccurrenceChanged as OccurrenceChangedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  TokenChanged as TokenChangedEvent
} from "../generated/SafetyFirst/SafetyFirst"
import {
  Claimed,
  DisasterRegistered,
  OccurrenceChanged,
  OwnershipTransferred,
  TokenChanged
} from "../generated/schema"

export function handleClaimed(event: ClaimedEvent): void {
  let entity = new Claimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.victim = event.params.victim
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDisasterRegistered(event: DisasterRegisteredEvent): void {
  let entity = new DisasterRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.disasterId = event.params.disasterId
  entity.status = event.params.status
  entity.disaster_category = event.params.disaster.category
  entity.disaster_location = event.params.disaster.location
  entity.disaster_evidence = event.params.disaster.evidence

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOccurrenceChanged(event: OccurrenceChangedEvent): void {
  let entity = new OccurrenceChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.disasterId = event.params.disasterId
  entity.occurrence = event.params.occurrence

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenChanged(event: TokenChangedEvent): void {
  let entity = new TokenChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newToken = event.params.newToken

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
