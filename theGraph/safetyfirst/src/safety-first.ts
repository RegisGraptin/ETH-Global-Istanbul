import { Bytes } from "@graphprotocol/graph-ts"
import {
  DisasterRegistered as DisasterRegisteredEvent,
} from "../generated/SafetyFirst/SafetyFirst"
import {
  DisasterRegistered
} from "../generated/schema"


export function handleDisasterRegistered(event: DisasterRegisteredEvent): void {
  let entity = new DisasterRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  let id: Bytes = event.params.disasterId

  entity.disasterId = id.toHexString()
  entity.status = event.params.status
  entity.disaster_category = event.params.disaster.category
  entity.disaster_location = event.params.disaster.location
  entity.disaster_evidence = event.params.disaster.evidence

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

