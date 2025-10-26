import React from 'react';

export type Language = 'en' | 'es' | 'pt' | 'fr' | 'sv';

export type MultilingualString = Record<Language, string>;

export enum N1Type {
  TCC = "TCC",
  Base = "Base",
  BaseASC = "Base ASC",
}

export enum RestorationType {
  Unitaria = "Unitaria",
  Multiple = "Múltiple",
}

export enum CaseStatus {
  Local = "Producción Local",
  Procera = "Producción Procera",
  Standard = "Standard",
  Otros = "Otros",
}

export enum ConnectionType {
  Branemark = "Brånemark",
  CC = "CC",
  MultiUnit = "Multi Unit",
  N1 = "N1",
  N1Base = "N1 Base",
  On1 = "On1",
  Pearl = "Pearl",
  TriChannel = "Tri-channel",
}

export enum SoftwareType {
  DTX = "DTX",
  Exocad = "Exocad",
  ThreeShape = "3Shape",
  Dentalwings = "Dentalwings",
}

export interface DentalCase {
  id: string;
  caseNumber: number;
  patientName: MultilingualString;
  restorationType: RestorationType[];
  connectionType: ConnectionType;
  compatibleConnections?: ConnectionType[];
  n1Type?: N1Type;
  status: CaseStatus;
  reference: string;
  notes?: string;
  imageUrls: string[];
  baseCementada?: boolean | 'N/A';
  angulacion?: boolean | 'N/A';
  observaciones?: string;
  torque?: 15 | 20 | 35;
}

export interface Filters {
  searchText: string;
  status: CaseStatus | "";
  type: RestorationType | "";
  connectionType: ConnectionType | "";
  softwareType: SoftwareType | "";
  angulation: "true" | "false" | "";
}