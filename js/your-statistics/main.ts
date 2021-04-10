import { handleInternetExplorer } from "../common/functions.js";
import PageLoader from "../common/PageLoader.js";
import Navbar from "../common/Navbar.js";
import StatisticsStorage from "../common/StatisticsStorage.js";
import WpmTable from "./WpmTable.js";
import AccuracyTable from "./AccuracyTable.js";
import ParticipationTable from "./ParticipationTable.js";
import {
  clearStatisticsStorage_button,
  toggleVisibilityAccuracyStatistics_button,
  toggleVisibilityParticipationStatistics_button,
  toggleVisibilityWpmStatistics_button
} from "./page-elements.js";
import ElementVisibility from "../common/ElementVisibility.js";

handleInternetExplorer();

const pageLoader = new PageLoader();
const navbar = new Navbar();
const wpmTable = new WpmTable();
const accuracyTable = new AccuracyTable();
const participationTable = new ParticipationTable();

function main() {
  navbar.addToggleItemsListVisibilityButtonClickEventListener();
  applyStoredVisibilitySettingsForAllCollapsibleElements();
  addButtonClickEventListenersForAllElementVisibilityTogglers();
  refreshAllTables();
  clearStatisticsStorage_button.addEventListener("click", clearStatisticsButtonClickEventHandler);
  pageLoader.removeOverlay();
}

function applyStoredVisibilitySettingsForAllCollapsibleElements() {
  ElementVisibility.applyStoredSettings(
    wpmTable.tableElement,
    WpmTable.ELEMENT_ID,
    wpmTable.toggleVisibilityButtonElement,
    WpmTable.DEFAULT_IS_VISIBLE_BOOL,
  );
  ElementVisibility.applyStoredSettings(
    accuracyTable.tableElement,
    AccuracyTable.ELEMENT_ID,
    accuracyTable.toggleVisibilityButtonElement,
    AccuracyTable.DEFAULT_IS_VISIBLE_BOOL
  );
  ElementVisibility.applyStoredSettings(
    participationTable.tableElement,
    ParticipationTable.ELEMENT_ID,
    participationTable.toggleVisibilityButtonElement,
    ParticipationTable.DEFAULT_IS_VISIBLE_BOOL
  );
}

function addButtonClickEventListenersForAllElementVisibilityTogglers() {
  ElementVisibility.addToggleButtonClickEventListener(
    wpmTable.tableElement,
    WpmTable.ELEMENT_ID,
    toggleVisibilityWpmStatistics_button
  );
  ElementVisibility.addToggleButtonClickEventListener(
    accuracyTable.tableElement,
    AccuracyTable.ELEMENT_ID,
    toggleVisibilityAccuracyStatistics_button
  );
  ElementVisibility.addToggleButtonClickEventListener(
    participationTable.tableElement,
    ParticipationTable.ELEMENT_ID,
    toggleVisibilityParticipationStatistics_button
  );
}

function clearStatisticsButtonClickEventHandler() {
  const didUserPressOk = confirm(
    "Are you sure you want to clear your statistics?\n" +
    "This cannot be undone."
  );
  if (!didUserPressOk) {
    return;
  }
  StatisticsStorage.removeAllItems();
  setTimeout(refreshAllTables, 250);
}

function refreshAllTables() {
  wpmTable.renderAllCells();
  accuracyTable.renderAllCells();
  participationTable.renderAllCells();
}

main();